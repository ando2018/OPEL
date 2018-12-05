import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../_service/google-analytics-events.service';
import { GaHomePageService } from '../_ga/services';
import { srcButton, srcDefault, srcZoneText } from '../_ga/const';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public default = srcDefault;
    public button = srcButton;
    public zoneText = srcZoneText;

    activeSlideIndex = 0;

    constructor(private ga: GoogleAnalyticsEventsService, private homePageService: GaHomePageService) {
    }

    ngOnInit() {
        this.emitEvent(this.activeSlideIndex, srcDefault);
    }

    menus = [
        {
            background: { title: 'Véhicules', src: 'assets/img/slide-1.png' },
            title: 'Véhicules',
            tip: `Découvrez l\’étendue de notre gamme de véhicules<br />adaptés à toutes vos envies.            `,
            icon: { title: 'vehicules', src: 'assets/img/picto/picto_vehicules.svg' },
            navigateTo: '/pages/vehicles'
        },
        {
            background: { title: 'Configurateur', src: 'assets/img/slide-2.png' },
            title: 'Configurateur',
            tip:
                'Choisissez votre niveau de finition, votre motorisation,<br />vos options et visualisez votre véhicule sur mesure.',
            icon: { title: 'Configurateur', src: 'assets/img/picto/picto_configurateur.svg' },
            navigateTo: '/pages/configurator'
        },
        {
            background: { title: 'Accessoires', src: 'assets/img/slide-3.png' },
            title: 'Accessoires',
            tip: 'Besoin d\’un accessoire ?<br />Sélectionnez les accessoires de votre choix.',
            icon: { title: 'Accessoires', src: 'assets/img/picto/picto_accessoires.svg' },
            navigateTo: '/pages/accessories'
        },
        {
            background: { title: 'Vidéos', src: 'assets/img/slide-4.png' },
            title: 'Vidéos',
            tip: 'Découvrez notre gamme de <br />véhicules en image.',
            icon: { title: 'Vidéos', src: 'assets/img/picto/picto_videos.svg' },
            navigateTo: '/pages/videos-categories'
        },
        {
            background: { title: 'NOS OFFRES', src: 'assets/img/slide-5.png' },
            title: 'NOS OFFRES',
            tip: 'Découvrez nos offres exclusives<br />sur une sélection de véhicules particuliers.',
            icon: { title: 'Offres spéciales', src: 'assets/img/picto/picto_promos.svg' },
            navigateTo: '/pages/special-offers'
        },
        {
            background: { title: 'Brochures', src: 'assets/img/slide-6.png' },
            title: 'Brochures',
            tip: 'Récupérez nos brochures par mail.',
            icon: { title: 'Demande de brochure', src: 'assets/img/picto/picto_brochure.svg' },
            navigateTo: '/pages/brochure'
        }
    ];

    toMenu(i: number, src: string) {
        this.activeSlideIndex = i;
        this.emitEvent(i, src);
    }

    public emitEvent(index: number, src: string = srcDefault) {
        this.homePageService.showPage(index, src);
    }
}
