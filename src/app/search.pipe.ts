import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

	name: 'search'

})


export class SearchPipe implements PipeTransform{

	transform(getedProduction, value){
		return getedProduction.filter(product => {
			
			if (value  === '' || value === null){
				return product;
			}else { 
				return product.title.includes(value);
			};
		});
	}

}