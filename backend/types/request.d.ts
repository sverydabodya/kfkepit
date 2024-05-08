interface MulterRequest {
	files: {
		[fieldname: string]: Express.Multer.File[];
	};
}

