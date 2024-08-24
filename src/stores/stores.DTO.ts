import { Exclude, Expose, Transform } from "class-transformer";

@Exclude()
export class StoreReturnDTO {
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
}

@Exclude()
export class StoresReturnDTO {
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
	reviews: string;
}
