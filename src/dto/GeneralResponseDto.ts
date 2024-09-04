/**
 * GeneralResponseDto
 */
export enum ResponseCode {
    SUCCESS,
    FAILURE,
}

export interface IGeneralResponseDto {
    code: ResponseCode;
}
