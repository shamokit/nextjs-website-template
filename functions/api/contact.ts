export const onRequestPost: PagesFunction = async ({request}) => {
	const body = await request.json() as {
		name?:  string,
		email?:  string,
	}
	const ErrorResponse = new Response('401 Unauthorized', { status: 401 })
	if(!body) return ErrorResponse
	// validation
	const {
		name,email
	} = body

	const errorMessages = {
		errors: {
			name: [],
			email: [],
		}
	}
	const regexEmail = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
	if(!name) {
		errorMessages.errors.email.push({'required': '名前は必須です。'})
	}
	if(!email) {
		errorMessages.errors.email.push({'required': 'メールアドレスは必須です。'})
	}
	if(!regexEmail.test(email)) {
		errorMessages.errors.email.push({'email': 'メールアドレスを入力してください。'})
	}
	const HTTP_UNPROCESSABLE_ENTITY = 422
	const hasError = errorMessages.errors.name.length > 0 || errorMessages.errors.email.length > 0
	const headers = {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	}

	// error
	if(hasError) {
		return new Response(JSON.stringify(errorMessages, null, 2), {...headers, ...{
			status: HTTP_UNPROCESSABLE_ENTITY
		}})
	}

	// success
	return new Response(JSON.stringify('Message sent successfully', null, 2), headers)
}
