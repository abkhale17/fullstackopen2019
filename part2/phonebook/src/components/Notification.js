import React from 'react'
import '../index.css'

function Notification(props){
	return (
		<div>
	
			{
				props.message === null ?
					<div>{/*.*/}</div>
					:
					<div className='Notify'>
						{props.message}
					</div>
			}

			
			{
				props.error === null ?
					<div>{/*.*/}</div>
					:
					<div className='Error'>
						{props.error}
					</div>
			}
		</div>
	)
}
export default Notification