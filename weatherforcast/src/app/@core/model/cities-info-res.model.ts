
export interface CitiesInfoRes {
    geonames: GeoNameData[];
    totalResultsCount: number;

}
export interface GeoNameData {

    adminCode1: string;
    lng: string;
    geonameId: number;
    toponymName: string;
    countryId: string;
    fcl: string;
    population:number;
    countryCode: string;
    name: string;
    fclName: string;
    adminCodes1: {ISO3166_2: string;};
    countryName: string;
    fcodeName: string;
    adminName1: string;
    lat: string;
    fcode: string;
    temp?:string

}