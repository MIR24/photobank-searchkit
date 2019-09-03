import {
    requestPhotoBankBase,
} from './Base';

export function deleteFile (fileId) {
    return requestPhotoBankBase({
        action: 'delete',
        file_id: fileId,
    })
}
