export class CropModel {
    cropCode: string;
    cropCommonName: string;
    cropScientificName: string;
    cropCategory: string;
    cropSeason: string;
    cropImage: File | null;
    fieldCode: string;


    constructor(
        cropCode: string,
        cropCommonName: string,
        cropScientificName: string,
        cropCategory: string,
        cropSeason: string,
        cropImage: File | null,
        fieldCode: string,

    ) {
        this.cropCode = cropCode;
        this.cropCommonName = cropCommonName;
        this.cropScientificName = cropScientificName;
        this.cropCategory = cropCategory;
        this.cropSeason = cropSeason;
        this.cropImage = cropImage;
        this.fieldCode = fieldCode;
    }
}
