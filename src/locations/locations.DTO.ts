import { Exclude, Expose } from "class-transformer";
import { Double } from "typeorm";

@Exclude()
export class LocationReturnDTO {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	state: string;

    @Expose()
	city: string;

    @Expose()
	category: string;

    @Expose()
	address: string;

    @Expose()
    tel: string;

	@Expose()
    menu: string;

	@Expose()
    likes: number; 

	@Expose()
	longitude: number;

	@Expose()
	latitude: number;
}

@Exclude()
export class DistanceStoresDTO {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	state: string;

    @Expose()
	city: string;

    @Expose()
	category: string;

    @Expose()
	address: string;

    @Expose()
    tel: string;

	@Expose()
    menu: any[];

	@Expose()
    likes: number; 

	@Expose()
	reviews: string;

	@Expose()
	longitude: number;

	@Expose()
	latitude: number;
}