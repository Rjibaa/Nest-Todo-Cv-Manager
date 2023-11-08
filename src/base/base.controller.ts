import { Get } from "@nestjs/common";
import { IBaseService } from './IBase.service';


export class BaseController<T>{

	constructor(private readonly IBaseService: IBaseService<T>) {}

	@Get()
	async findAll(): Promise<T[]> {
	  return this.IBaseService.getAll()
	}
}