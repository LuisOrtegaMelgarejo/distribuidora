import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        InputTextModule,
        InputNumber,
        InputNumberModule,
        FloatLabel,
        PasswordModule,
        ButtonModule,
        SelectModule
    ],
    exports: [
        FormsModule,
        InputTextModule,
        InputNumber,
        FloatLabel,
        PasswordModule,
        ButtonModule,
        SelectModule
    ]
})
export class SharedModule { }