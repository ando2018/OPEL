import { Request, Response } from 'express';

class UploadController {
    add(req: Request, res: Response): void {
        res.status(200).json({ message: 'sucess' });
    }
}

export const uploadController = new UploadController();
