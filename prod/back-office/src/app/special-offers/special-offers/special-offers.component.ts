import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import { SpecialOffersService } from '../special-offers.service';
import { Offer, SpecialOffer } from '../special-offers.model';
import { environment } from '../../../environments/environment';
import { forkJoin, Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { GlobalSharedService } from '../../global-shared.service';

@Component({
    selector: 'app-special-offers',
    templateUrl: './special-offers.component.html',
    styleUrls: ['./special-offers.component.css']
})
export class SpecialOffersComponent implements OnInit {
    form: FormGroup;
    formMentionLegale: FormGroup;
    shown = false;
    selectedSlideSrc = '';
    selectedSlideFilename = '';
    btnSubmitClicked = false;
    fileOfferPattern = /\.(jpe?g|JPE?G|PNG|png)$/i;
    months: string[] = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Aout',
        'Septembre',
        'Octobre',
        'Novembre',
        'Decembre'
    ];

    constructor(
        private specialOffersService: SpecialOffersService,
        private fb: FormBuilder,
        private fbMentionslegales: FormBuilder,
        private globalSharedService: GlobalSharedService
    ) { }

    ngOnInit() {
        this.specialOffersService.getSpecialOffers().subscribe(specialOffer => {
            this.form = this.initForm(specialOffer);
            this.formMentionLegale = this.initFormMentionLegales(specialOffer);
        });
    }

    saveSpecialOffersSlides() {
        const specialOffer: SpecialOffer = { ...this.form.value };
        specialOffer.offers = specialOffer.offers.filter(offer => !offer.deleted);
        this.uploadVisualsIfAny(specialOffer.offers)
            .pipe(flatMap(() => this.createOrUpdate(specialOffer)))
            .subscribe(
                s => this.onSaved(s),
                err => {
                    this.globalSharedService
                        .toasterError({ body: err.statusText })
                        .subscribe(() => { });
                }
            );
    }

    saveSpecialOffersMentionLegale() {
        const specialOffer: SpecialOffer = { ...this.formMentionLegale.value };
        specialOffer._id
            ? this.partialupdateMentionLegal(specialOffer)
            : this.specialOffersService.createSpecialOffer(specialOffer).subscribe(s => this.onSaved(s),
                err => {
                    this.globalSharedService
                        .toasterError({ body: err.statusText })
                        .subscribe(() => { });
                });
    }

    private partialupdateMentionLegal(specialOffer) {
        this.specialOffersService.partialUpdate(specialOffer).subscribe(res => {
            this.globalSharedService
                .toasterSuccess({ body: 'Modifications enregistrées' })
                .subscribe(() => { this.btnSubmitClicked = false; });
        }, err => {
            this.globalSharedService
                .toasterError({ body: err.statusText })
                .subscribe(() => { });
        });
    }

    private onSaved(specialOffer: SpecialOffer) {
        this.offers.controls = this.offers.controls.filter(c => c.get('deleted').value === false);
        this.globalSharedService
            .toasterSuccess({ body: 'Modifications enregistrées' })
            .subscribe(() => { this.btnSubmitClicked = false; });
    }

    private createOrUpdate(specialOffer: SpecialOffer): Observable<SpecialOffer> {
        return specialOffer._id
            ? this.specialOffersService.updateSpecialOffer(specialOffer)
            : this.specialOffersService.createSpecialOffer(specialOffer);
    }

    private uploadVisualsIfAny(list: Offer[]): Observable<boolean> {
        const filesToUpload = list
            .filter(e => e.file && e.deleted === false)
            .map(({ file }) => file);
        return filesToUpload.length ? this.sendFiles(filesToUpload) : of(true);
    }

    private sendFiles(files: File[]): Observable<boolean> {
        return forkJoin(
            files.map(file => this.specialOffersService.sendSpecialOffersVisual(file))
        ).pipe(map(() => true));
    }

    get offers(): FormArray {
        return this.form.get('offers') as FormArray;
    }

    toggleDelete(offer: FormControl) {
        offer.get('deleted').setValue(!offer.get('deleted').value);
    }

    handleFileInput(files: FileList) {
        let addedFiles: File[] = Object.values(files);
        addedFiles = addedFiles.filter((o, i) => this.fileOfferPattern.test(o.name));
        if (files.length !== addedFiles.length) {
            this.globalSharedService
                .toasterWarrning({
                    body: "l'enregistrement ne supporte que les types : PNG , JPEG, JPG"
                })
                .subscribe(() => { });
        }
        Promise.all(addedFiles.map(this.readFileAsDataUrl)).then((dataUrls: string[]) => {
            const newList: FormGroup[] = addedFiles.map((file, i) =>
                this.initOffer({
                    title: '',
                    months: [],
                    fileName: file.name,
                    file,
                    src: dataUrls[i],
                    deleted: false
                })
            );
            const offers = this.form.get('offers') as FormArray;
            newList.forEach((n: FormGroup) => offers.push(n));
        });
    }

    show(offer: FormControl) {
        this.shown = true;
        this.selectedSlideSrc = offer.get('src').value;
        this.selectedSlideFilename = offer.get('fileName').value;
    }

    private readFileAsDataUrl(file: File): Promise<string> {
        return new Promise(resolve => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    }

    private initForm(specialOffer: SpecialOffer): FormGroup {
        return this.fb.group({
            _id: specialOffer._id,
            offers: this.initOffers(specialOffer.offers)
        });
    }

    private initFormMentionLegales(specialOffer: Partial<SpecialOffer>): FormGroup {
        return this.fbMentionslegales.group({
            _id: specialOffer._id,
            legalNotice: [specialOffer.legalNotice, Validators.required]
        });
    }

    private initOffers(offers: Offer[]): FormArray {
        return this.fb.array(
            offers.map(({ title, months, fileName }: Offer) => {
                const src = environment.isMock
                    ? `assets/img/${fileName}`
                    : `${environment.mediasBaseUrl}/${environment.imagesFolder}/${fileName}`;
                return this.initOffer({ title, months, fileName, file: null, src, deleted: false });
            })
        );
    }

    private initOffer(offer: Offer): FormGroup {
        return this.fb.group({
            title: [offer.title, Validators.compose([
                Validators.required,
                Validators.maxLength(30)
            ])],
            months: [offer.months, this.monthMinLengthValidator],
            fileName: [offer.fileName, Validators.required],
            file: offer.file,
            src: offer.src,
            deleted: offer.deleted
        });
    }

    private monthMinLengthValidator(control: AbstractControl): { [key: string]: any } | null {
        return control.value.length < 1 ? { visualMinLength: { value: control.value } } : null;
    }

    formValidation() {
        this.btnSubmitClicked = true;
        return this.btnSubmitClicked;
    }

    isRequired(value) {
        if (this.btnSubmitClicked) {
            if (!value.valid) {
                value.markAsDirty();
            }
        }
        return !value.valid && value.dirty;
    }
}
