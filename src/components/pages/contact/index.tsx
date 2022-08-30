import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
type FormData = {
  name: string;
  email: string;
};
export const PageContact = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()
	const onSubmit = (data: FormData) => {
		var formData = new FormData();
		for ( const [key, value] of Object.entries(data) ) {
			formData.append(key, value);
		}
		axios.post("/api/submit", formData).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p>
				<label htmlFor="name">Name</label>
				<input id="name" {...register('name', { required: true })} />
			</p>
			{errors.name && <span>This field is required</span>}
			<p>
				<label htmlFor="email">Email</label>
				<input id="email" {...register('email', { required: true })} />
			</p>
			{errors.email && <span>This field is required</span>}
			<button type="submit">Submit</button>
		</form>
	)
}
