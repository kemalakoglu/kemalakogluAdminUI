import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <!--<span class="created-by">Created with ♥ by <b><a href="https://akveo.com" target="_blank">Akveo</a></b> 2019</span>-->
    <div class="socials">
      <a href="https://github.com/kemalakoglu" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/kemalakoglu/" target="_blank" class="ion ion-social-linkedin"></a>
      <a href="https://twitter.com/kemalakoglu1" target="_blank" class="ion ion-social-twitter"></a>
    </div>
  `,
})
export class FooterComponent {
}
