import {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Banner from '../components/Banner'
import Categories from '../components/Categories'

export default function Home(){

	return(
		<Fragment>
			<Banner/>
			<Categories/>
		</Fragment>	
	)
}