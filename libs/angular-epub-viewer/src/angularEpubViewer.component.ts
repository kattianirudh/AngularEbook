import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subscription} from "rxjs/Subscription";
import {
    EpubChapter,
    EpubError,
    EpubLocation,
    EpubMetadata,
    EpubPage,
    EpubSearchResult
} from "./angularEpubViewer.models";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/filter';

declare const ePub: any;

/**
 * AngularEpubViewer component
 */
@Component({
    selector: 'angular-epub-viewer',
    template: `<div id="angularEpubViewerComponent" [style.padding]="padding" #angularEpubViewerComponent></div>`,
    styles: [`
        #angularEpubViewerComponent {
            width: 100%;
            height: 100%;
            margin: 0;
            overflow: hidden;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AngularEpubViewerComponent implements AfterViewInit, OnDestroy {

    /**
     * Root container's DOM reference
     */
    @ViewChild('angularEpubViewerComponent', {read: ElementRef})
    root: ElementRef;

    /**
     * Primary object
     */
    epub: any = null;

    /**
     * Current location of document's rendered part
     */
    location: EpubLocation = null;

    /**
     * Root container's padding in px, em, etc.
     */
    @Input()
    padding: string = null;
    /**
     * Enables auto calculate of pagination after loading document or changes of viewport size
     */
    @Input()
    autoPagination: boolean = false;
    /**
     * Enables auto loading of metadata after loading document
     */
    @Input()
    autoMetadata: boolean = false;
    /**
     * Enables auto loading of table of contents after loading document
     */
    @Input()
    autoTOC: boolean = false;

    /**
     * Get event when document is loaded
     */
    @Output('onDocumentReady')
    onDocumentReady: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Get event when chapter is unloaded
     */
    @Output('onChapterUnloaded')
    onChapterUnloaded: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Get event when chapter is displayed
     */
    @Output('onChapterDisplayed')
    onChapterDisplayed: EventEmitter<EpubChapter> = new EventEmitter<EpubChapter>();
    /**
     * Get event about search results
     */
    @Output('onSearchFinished')
    onSearchFinished: EventEmitter<EpubSearchResult[]> = new EventEmitter<EpubSearchResult[]>();
    /**
     * Get event about pagination
     */
    @Output('onPaginationComputed')
    onPaginationComputed: EventEmitter<EpubPage[]> = new EventEmitter<EpubPage[]>();
    /**
     * Get event about the current location
     */
    @Output('onLocationFound')
    onLocationFound: EventEmitter<EpubLocation> = new EventEmitter<EpubLocation>();
    /**
     * Get event about metadata
     */
    @Output('onMetadataLoaded')
    onMetadataLoaded: EventEmitter<EpubMetadata> = new EventEmitter<EpubMetadata>();
    /**
     * Get event about table of contents
     */
    @Output('onTOCLoaded')
    onTOCLoaded: EventEmitter<EpubChapter[]> = new EventEmitter<EpubChapter[]>();
    /**
     * Get event when any error occurred
     */
    @Output('onErrorOccurred')
    onErrorOccurred: EventEmitter<EpubError> = new EventEmitter<EpubError>();

    /**
     * Starts loading document by link after DOM is ready
     */
    private _link: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private linkSubscription: Subscription;

    private paginationSubscription: Subscription;

    constructor(private zone: NgZone) {}

    ngAfterViewInit() {
        /*this.paginationSubscription = this.onBookReady.asObservable()
            .subscribe(() => {
                if (this.enablePagination) {
                    this.zone.runOutsideAngular(() => {
                        this.epub.generatePagination()
                            .then((pages: EpubPage[]) => {
                                this.zone.run(() => {
                                    this.onPagination.next(pages);
                                });
                            })
                            .catch(() => {
                                this.zone.run(() => {
                                    this.onError.emit(EpubError.PAGINATION);
                                });
                            });
                    });
                }
            });
        this.linkSubscription = this._link.asObservable()
            .filter(link => link != null)
            .subscribe(link => {
                this.initEpub({
                    bookPath: link
                });
            });*/
    }

    private initEpub = (properties: object) => {
        this.destroyEpub();
        this.epub = ePub(properties);
        this.epub.renderTo('angularEpubViewerComponent');
        /*this.epub.on('book:ready', () => {
            this.onBookReady.next(null);
        });
        this.epub.on('renderer:chapterUnloaded', () => {
            this.onChapterUnloaded.next(null);
        });
        this.epub.on('renderer:chapterDisplayed', chapter => {
            this.onChapterDisplayed.next(null);
        });
        this.epub.on('renderer:visibleRangeChanged', () => {
            // renderer:locationChanged is a part of this event

        });
        this.epub.on('renderer:resized', () => {

        });*/
    };

    /**
     * Opens EPUB document by link
     * @param link
     */
    openLink(link: string) {
        this._link.next(link);
    }

    /**
     * Opens EPUB document file
     * @param file
     */
    openFile(file: File) {
        if (window['FileReader']) {
            this.zone.runOutsideAngular(() => {
                const reader: FileReader = new FileReader();
                reader.onload = () => {
                    this.zone.run(() => {
                        this.initEpub({
                            bookPath: reader.result
                        });
                    });
                };
                reader.onerror = () => {
                    this.zone.run(() => {
                        this.onErrorOccurred.emit(EpubError.OPEN_FILE);
                    });
                };
                reader.readAsArrayBuffer(file);
            });
        } else {
            this.onErrorOccurred.emit(EpubError.OPEN_FILE);
        }
    }

    /**
     * Navigates to the specified url or EPUB CFI or page
     * @param location
     */
    goTo(location: string | number) {

    }

    /**
     * Navigates to the next page
     */
    nextPage() {

    }

    /**
     * Navigates to the previous page
     */
    previousPage() {

    }

    /**
     * Searches all text matches *in the current chapter*
     * @param text
     */
    searchText(text: string) {

    }

    /**
     * Adds style to be attached to the document's body element
     * @param style
     * @param value
     */
    setStyle(style: string, value: string) {
        this.epub.setStyle(style, value);
    }

    /**
     * Removes a style from the rendered document
     * @param style
     */
    resetStyle(style: string) {
        this.epub.removeStyle(style);
    }

    /**
     * Calculates pagination as output event
     */
    computePagination() {

    }

    /**
     * Loads metadata as output event
     */
    loadMetadata() {
        //Observable.fromPromise(this.epub.getMetadata());
    }

    /**
     * Loads table of contents as output event
     */
    loadTOC() {
        //Observable.fromPromise(this.epub.getToc());
    }

    private destroyEpub() {
        if (this.epub) {
            this.epub.destroy();
            this.epub = null;
        }
    };

    ngOnDestroy() {
        if (this.paginationSubscription) {this.paginationSubscription.unsubscribe();}
        if (this.linkSubscription) {this.linkSubscription.unsubscribe();}
        this.destroyEpub();
    }
}
