import {Component, ViewEncapsulation} from '@angular/core'
import {features} from '../data'

import {clamp} from '@st-graphics/angular-scrolly'

@Component({
  selector: 'my-story',
  templateUrl: './my-story.component.html',
  styleUrls: ['./my-story.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyStoryComponent {
  features = features.reverse()
  clamp = clamp
}
