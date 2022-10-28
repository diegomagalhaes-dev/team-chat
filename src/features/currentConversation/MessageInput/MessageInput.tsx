import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { getMessageDrafts } from "features/joinedConversations/DraftsModel";
import { updateMessageDraft } from "features/joinedConversations/updateMessageDraftCommand";
import { discardMessageDraft } from "features/joinedConversations/discardMessageDraftCommand";
import { sendMessage } from "features/messages/sendMessage";
import { MessageType } from "features/messages/messageModel";
import { DraftMessage } from "features/messages/draft";
import { MessageEditor } from "features/messages/MessageEditor";
import { getCurrentConversationId } from "../currentConversationModel";
import { Wrapper } from "./MessageInput.style";

const getConversationMessageDraft = createSelector(
  [getMessageDrafts, getCurrentConversationId],
  (drafts, conversationId): DraftMessage | undefined => {
    return drafts[conversationId];
  }
);

/**
 * Allow editing and sending messages
 */
export const MessageInput = () => {
  const conversationId: string = useSelector(getCurrentConversationId);
  const userId: string = useSelector(getLoggedInUserId);
  const storedDraft: DraftMessage | undefined = useSelector(
    getConversationMessageDraft
  );
  const defaultDraft: DraftMessage = {
    type: MessageType.Text,
    senderId: userId,
    text: ""
  };
  const message: DraftMessage = storedDraft ? storedDraft : defaultDraft;
  const dispatch = useDispatch();

  const send = (appMessage: DraftMessage) => {
    dispatch(sendMessage(appMessage));
    dispatch(discardMessageDraft(conversationId));
  };

  const update = (appMessage: DraftMessage) => {
    dispatch(updateMessageDraft(conversationId, appMessage));
  };

  return (
    <Wrapper>
      <MessageEditor
        message={message}
        sendDraft={send}
        updateDraft={update}
      ></MessageEditor>
    </Wrapper>
  );
};
