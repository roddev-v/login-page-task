import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(undefined, [Validators.email, Validators.required]),
      password: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
      passwordCheck: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
      birthdate: new FormControl(undefined, [Validators.required])
    }, {validators: this.passwordCheck});
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.submitted = true;
  }

  isFieldInvalid(name: string): boolean {
    const field = this.loginForm.get(name);
    return field.invalid && (field.touched || field.dirty);
  }

  getInputFormClass(name: string): string {
    const cssClass = this.isFieldInvalid(name) ? 'form-input-invalid' : '';
    return `form-input ${cssClass}`;
  }

  passwordCheck(group: FormGroup): ValidationErrors | null {
    const password = group.get('password');
    const passwordCheck = group.get('passwordCheck');
    if (password.value !== passwordCheck.value) {
      return {passwordMissMatch: true};
    }
    return null;
  }
}
