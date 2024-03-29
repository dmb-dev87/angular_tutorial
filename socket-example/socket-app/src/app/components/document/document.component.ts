import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Document } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss'
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  private _docSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Select an existing document or create a new one to get started' })
    ).subscribe(document => this.document = document);
  }

  ngOnDestroy(): void {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }
}
