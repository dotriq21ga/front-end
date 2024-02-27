import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
    NbButtonModule,
    NbCardModule,
    NbChatModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbDialogModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbThemeModule,
    NbUserModule,
    NbAutocompleteModule,
    NbToastrModule,
    NbTooltipModule
} from '@nebular/theme';

const NebularComponents = [
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbSidebarModule,
    NbLayoutModule,
    NbCardModule,
    NbListModule,
    NbEvaIconsModule,
    NbUserModule,
    NbIconModule,
    NbChatModule,
    NbContextMenuModule,
    NbFormFieldModule,
    NbMenuModule,
    NbSpinnerModule,
    NbAutocompleteModule,
    NbTooltipModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
]

@NgModule({
    imports: [NebularComponents],
    exports: [NebularComponents]
})

export class NebularModule { }