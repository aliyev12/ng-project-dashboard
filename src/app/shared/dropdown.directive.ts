import { Directive, HostListener, HostBinding } from  '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen = false;
    
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}




//This directive will listen for clicks on the 
//manage dropdown menu, and it will toggle an open
//class every time the button is clicked.

//To listen to a click, we need to add a Hostlistener first:
//So, if isOpen was true, on click it will be turned into
//false, and vice-versa...

// Add a certain css class to the element it 
// sits on once it is clicked and remove
// the class when we click again..
// Listen to clicks and toggle some property

//To add a css class, we can use a HostBinding

//Allows us to bind to properties of elements to which
//it is attached to...
//By putting HostBinging('class.open') , we simply 
//specify that we would like to bind to the class of
// whatever element...
// class. itself is an array of all classes, and whatever
// specific class name gets placed after: class.open