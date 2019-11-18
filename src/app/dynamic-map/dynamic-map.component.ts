import {
  Component,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges
} from '@angular/core'
import setupMap from '../services/setupMap'

import {Map} from 'mapbox-gl'
import {ExposedScope} from '@st-graphics/angular-scrolly'
import {Feature} from '../data'

type FeatureStateSetter = (state: object) => void

@Component({
  selector: 'dynamic-map',
  templateUrl: './dynamic-map.component.html',
  styleUrls: ['./dynamic-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicMapComponent implements OnInit, OnChanges {

  @Input() slideIndex: number
  @Input() enter: ExposedScope.enter
  @Input() progress: ExposedScope.progress
  @Input() features: Feature[]

  @ViewChild('base', {static: true}) mapContainer: ElementRef

  map: Map = null
  featureStateSetters: FeatureStateSetter[] = null

  constructor () {}

  get currentFeature () {
    return this.features[this.slideIndex]
  }

  ngOnInit () {
    setupMap(this.mapContainer.nativeElement, map => {
      const mapFeatures = map.querySourceFeatures('osmbuildings', {sourceLayer: 'building'})
      this.map = map
      this.featureStateSetters = this.features.map(row => {
        const filtered = mapFeatures.filter(row.filter)
        return state => filtered.forEach(f => {
          map.setFeatureState({
            source: 'osmbuildings',
            sourceLayer: 'building',
            id: f.id
          }, state)
        })
      })
    })
  }

  ngOnChanges (changes: SimpleChanges) {
    if (this.featureStateSetters && changes.slideIndex) {
      this.featureStateSetters.forEach((setter, i) => {
        const highlighted = i === changes.slideIndex.currentValue
        setter({highlighted})
      })
    }
      
    if (this.featureStateSetters && changes.enter) {
      const enter = changes.enter.currentValue
      this.featureStateSetters.forEach((setter, i) => {
        const factor = Math.max(enter(i, 300, 0), 1 - enter(i, 30, -300))
        setter({factor})
      })
    }

    if (this.featureStateSetters && changes.progress) {
      const t = changes.progress.currentValue.at(this.features.length)(true) || 0
      const b = (1 - t) * 190 + t * 60
      this.map.setBearing(b)
    }
  }
}
