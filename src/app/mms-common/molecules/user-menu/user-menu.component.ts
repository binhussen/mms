import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() user= {firstName: "Ezedin", lastName: "Fedlu"};
  @Input() currentUser = null;
  isOpen = false;
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) { return; }
    const clickedInsde = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInsde) { this.isOpen = false; }
  }
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
  }

}
