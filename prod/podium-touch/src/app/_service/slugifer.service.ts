import { Injectable } from '@angular/core';

@Injectable()
export class SlugifierService {
    public slugify (text, replaceSpecialChars = true) {
        const t = text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/&/g, '-and-')
            //.replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');

        return replaceSpecialChars ? this.replaceSpecialChars(t) : t;
    }

    public replaceSpecialChars(text) {
        const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
        const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
        const p = new RegExp(a.split('').join('|'), 'g');

        const t = text.toString().toLowerCase()
            .replace(p, c => b.charAt(a.indexOf(c)));

        return t;
    }
}
