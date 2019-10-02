import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface TransactionElement {
  asset: string;
  transaction: string;
  date: string;
  amount: string;
  from: string;
  to: string;
  status: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  CRYPTO_DATA: TransactionElement[] = [];
  assets_list = [];
  message = '';

  dtOptions: DataTables.Settings = {};

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'basic-datepicker-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/icn_calendar.svg')
    );
  }

  someClickHandler(info: any): void {
    this.message = info.asset + ' - ' + info.transaction + ' - ' + info.date + ' - ' + info.amount;
    console.log(this.message);
  }
  ngOnInit() {

    this.CRYPTO_DATA = [
      { asset: 'BTC', transaction: 'Deposit', date: '2019-01-30 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Pending' },
      { asset: 'BASIC', transaction: 'Send', date: '2019-01-29 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Pending' },
      { asset: 'ETH', transaction: 'Earned interest', date: '2019-01-28 23:00:00', amount: '$1,234,567.00', from: 'BASIC', to: '0x073903b96.....', status: 'Failed' },
      { asset: 'BTC', transaction: 'Paid interest', date: '2019-01-27 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: 'BASIC', status: 'Completed' },
      { asset: 'BASIC', transaction: 'Late fees', date: '2019-01-26 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: 'BASIC', status: 'Completed' },
      { asset: 'BASIC', transaction: 'Deposit', date: '2019-01-25 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'BTC', transaction: 'Send', date: '2019-01-24 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'BTC', transaction: 'Deposit', date: '2019-01-23 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'BASIC', transaction: 'Deposit', date: '2019-01-22 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: 'BASIC', status: 'Completed' },
      { asset: 'BASIC', transaction: 'Deposit', date: '2019-01-21 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: 'BASIC', status: 'Completed' },
      { asset: 'ETH', transaction: 'Deposit', date: '2019-01-20 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'ETH', transaction: 'Deposit', date: '2019-01-19 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'BTC', transaction: 'Send', date: '2019-01-24 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'BTC', transaction: 'Deposit', date: '2019-01-23 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'BASIC', transaction: 'Deposit', date: '2019-01-22 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: 'BASIC', status: 'Completed' },
      { asset: 'BASIC', transaction: 'Deposit', date: '2019-01-21 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: 'BASIC', status: 'Completed' },
      { asset: 'ETH', transaction: 'Deposit', date: '2019-01-20 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' },
      { asset: 'ETH', transaction: 'Deposit', date: '2019-01-19 23:00:00', amount: '$1,234,567.00', from: '0x073903b96.....', to: '0x073903b96.....', status: 'Completed' }
    ];

    this.assets_list = this.CRYPTO_DATA.map(a => a.asset);
    this.assets_list = this.assets_list.filter((item, index) => this.assets_list.indexOf(item) === index);

    this.dtOptions = {
      dom: '<"top"i>rt<"transaction-info"><"bottom"p><"clear">',
      pagingType: 'full_numbers',
      stateSave: true,
      searching: false,
      lengthChange: false,
      info: false,
      columns: [{
        title: 'Asset',
        data: 'asset'
      }, {
        title: 'Transaction',
        data: 'transaction'
      }, {
        title: 'Date',
        data: 'date'
      }, {
        title: 'Amount',
        data: 'amount'
      }, {
        title: 'From',
        data: 'from'
      }, {
        title: 'To',
        data: 'to'
      }, {
        title: 'Status',
        data: 'status'
      }],
      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //   const self = this;
      //   // Unbind first in order to avoid any duplicate handler
      //   // (see https://github.com/l-lin/angular-datatables/issues/87)
      //   $('td', row).unbind('click');
      //   $('td', row).bind('click', () => {
      //     self.someClickHandler(data);
      //   });
      //   return row;
      // }
    };
  }

}
