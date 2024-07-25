import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { Control, ControlMemberApi } from "@sassoftware/vi-api/control";
import { PageMode, PageModel } from "@sassoftware/vi-api/page-model";
import { NgIf } from "@angular/common";
import { Border, QRCodeModule } from "@progress/kendo-angular-barcodes";
import { MetadataApi } from "@sassoftware/vi-api/metadata";
import { SviWindow } from "@sassoftware/vi-api";
import { StoredObjectFieldDTO } from "@sassoftware/vi-api/svi-datahub";

const BASE_QR_URL = "https://www.sas.com"
const QR_COLOR = "#2e547b"

interface QrCodeAttributes {
  title?: {
    text: string
  };
  dataSource?: string;
}

@Component({
  selector: 'qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ["./qr-code.component.scss"],
  standalone: true,
  imports: [
    NgIf,
    QRCodeModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrCodeComponent implements OnInit {
  @Input() public childNode!: Control<QrCodeAttributes>;
  @Input() private pageModel!: PageModel;
  @Input() private controlApi!: ControlMemberApi;

  public options = {
    color: QR_COLOR,
    background: "transparent",
    border: {
      color: QR_COLOR,
      width: 5
    } as Border
  }

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  public get value(): string {
    if (!this.childNode.typeAttributes.dataSource) {
      return BASE_QR_URL;
    }
    return this.inDesignMode ? BASE_QR_URL : (this.pageModel.data[this.childNode.typeAttributes['dataSource']] || "");
  }

  public get inDesignMode(): boolean {
    return this.pageModel.mode === PageMode.Design;
  }

  public ngOnInit(): void {
    if (this.inDesignMode) {
      // markForCheck is used in design mode, because changes happen in this component
      this.controlApi.page.onPropertyChange(() => this.cdr.markForCheck())
    } else {
      // detectChanges is used in other modes, because changes happen in this component and the child component <kendo-qrcode>
      this.controlApi.page.onChange(() => this.cdr.detectChanges())
      this.getDataSourceMetadata().then(res => console.log(res));
    }
  }

  private getDataSourceMetadata = async (): Promise<StoredObjectFieldDTO | undefined> => {
    if (!this.pageModel.type) {
      return undefined;
    }
    const metadataAPI = (window as SviWindow).sas.vi.metadata as MetadataApi;
    const metadata = await metadataAPI.getEntity(this.pageModel.type);

    return metadata?.fields?.find(field => field.name === this.childNode.typeAttributes.dataSource);
  }
}
