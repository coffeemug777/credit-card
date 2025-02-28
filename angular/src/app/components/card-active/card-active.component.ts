import { Component, inject, OnInit } from '@angular/core';
import { CcService } from '../../services/cc.service';

@Component({
  selector: 'app-card-active',
  imports: [],
  templateUrl: './card-active.component.html',
  styleUrl: './card-active.component.scss',
})
export class CardActiveComponent implements OnInit {
  private ccService = inject(CcService);
  activeCard: any;

  ngOnInit(): void {
    this.activeCard = this.ccService.getActiveCard();

    console.log('Active card: ', this.activeCard);
  }
}
