/**
 * GeneralResponseDto
 */
enum Message {
    SUCCESS,
    FAILURE,
}

export type GeneralResponseDto = {
    message: keyof typeof Message;
};
