export class VehicleModel {
    vehicleCode: string;
    licensePlateNumber: string;
    vehicleCategory: string;
    fuelType: string;
    status: string;
    staffMemberDetails: string;
    remake: string;

    constructor(vehicleCode: string, licensePlateNumber: string, vehicleCategory: string, fuelType: string, status: string, staffMemberDetails: string,remake: string) {
        this.vehicleCode = vehicleCode;
        this.licensePlateNumber = licensePlateNumber;
        this.vehicleCategory = vehicleCategory;
        this.fuelType = fuelType;
        this.status = status;
        this.staffMemberDetails = staffMemberDetails;
        this.remake = remake;
    }
}