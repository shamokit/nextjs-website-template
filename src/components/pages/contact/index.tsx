import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
type FormDataProps = {
	name: string
	email: string
}
export const PageContact = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>()
	const onSubmit = (data: FormDataProps) => {
		const formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value)
		}
		// axios
		// 	.post('/api/contact', formData)
		// 	.then((res) => {
		// 		console.log(res)
		// 	})
		// 	.catch((err) => {
		// 		console.log(err)
		// 	})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p className='grid gap-2'>
				<label htmlFor="name">名前</label>
				<input id="name" {...register('name', { required: true })} />
			</p>
			{errors.name && <span>This field is required</span>}
			<p className='grid gap-2'>
				<label htmlFor="email">メールアドレス</label>
				<input id="email" {...register('email', { required: true })} />
			</p>
			{errors.email && <span>This field is required</span>}
			<button type="submit">送信する</button>
		</form>
	)
}
