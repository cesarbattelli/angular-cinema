import { Component, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IMovie } from '../../../interfaces/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-movie-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './new-movie-dialog.component.html',
  styleUrl: './new-movie-dialog.component.css',
})
export class NewMovieDialogComponent {
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMovie | null
  ) {
    this.movieForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      overview: [data?.overview || '', Validators.required],
      backdrop_path: [data?.backdrop_path || ''],
    });
  }

  submit() {
    if (this.movieForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.movieForm.value });
    }
  }

  close() {
    this.dialogRef.close();
  }

  handleFileInput(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.movieForm.patchValue({
          backdrop_path: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
