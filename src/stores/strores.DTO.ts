import { Exclude, Expose } from "class-transformer";

@Exclude()
export class StoreReturnDTO {
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
    
}

export class StoresReturnDTO extends StoreReturnDTO {
    
}[]