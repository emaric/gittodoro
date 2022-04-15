import { SessionPresenterInterface } from '@/interactor/responses/SessionPresenterInterface';
import { SessionResponse } from '@/interactor/responses/SessionResponse';
export declare class SessionStringOutputPresenter implements SessionPresenterInterface {
    output: string;
    constructor(output: string);
    present(session: SessionResponse): void;
}
