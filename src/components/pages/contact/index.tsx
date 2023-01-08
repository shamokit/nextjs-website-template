import React, { useState } from 'react'
import { axios } from '@/libs/axios'
import { useForm } from '@/libs/react-hook-form'
import { ErrorMessages } from '@/components/ui/error/ErrorMessages'
type FormDataProps = {
	name: string
	email: string
}
export const PageContact = () => {
	const [errorResponse, setErrorResponse] = useState<{
		errors: { [key in keyof FormDataProps]?: string[] }
	}>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>()
	type Rules = {
		[key in keyof FormDataProps]: Parameters<typeof register>[1]
	}
	const rules: Rules = {
		name: {
			required: '名前を入力してください。',
		},
		email: {
			required: 'メールアドレスを入力してください。',
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: 'メールアドレスの形式で入力してください。',
			},
		},
	}
	const formRequest = ({ url, data }: { url: string; data: FormDataProps }) => {
		const params = new URLSearchParams()
		Object.keys(data).forEach((name) => params.append(name, name))
		axios
			.post(url, data, {
				headers: { 'content-type': 'application/json' },
			})
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				setErrorResponse(err.response)
			})
	}
	const onSubmit = (data: FormDataProps) => {
		formRequest({ url: '/api/contact', data })
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-2">
				<label htmlFor="name">
					名前<span>必須</span>
				</label>
				<ErrorMessages errors={errors.name?.message} />
				<ErrorMessages errors={errorResponse?.errors.name} />
				<input
					id="name"
					aria-invalid={errors.name ? 'true' : 'false'}
					{...register('name', rules.name)}
				/>
			</div>
			<div className="grid gap-2">
				<label htmlFor="email">
					メールアドレス<span>必須</span>
				</label>
				<ErrorMessages errors={errors.email?.message} />
				<ErrorMessages errors={errorResponse?.errors.email} />
				<input
					id="email"
					aria-invalid={errors.email ? 'true' : 'false'}
					{...register('email', rules.email)}
				/>
			</div>
			<button type="submit">送信する</button>
		</form>
	)
}
