import React from "react";
import NotificationSwitchGroup from "@/components/notification-switch-group";
import NotificationSwitchRow from "@/components/notification-switch-row";
import BlueButton from "@/components/ui/blue-button";

export interface SettingsNotificationsTabProps {
  // Comments
  commentReply: boolean;
  setCommentReply: (v: boolean) => void;
  commentMention: boolean;
  setCommentMention: (v: boolean) => void;
  commentInCollection: boolean;
  setCommentInCollection: (v: boolean) => void;
  commentInEdit: boolean;
  setCommentInEdit: (v: boolean) => void;
  // Ratings
  commentRating: boolean;
  setCommentRating: (v: boolean) => void;
  collectionRating: boolean;
  setCollectionRating: (v: boolean) => void;
  // Edits
  editAccepted: boolean;
  setEditAccepted: (v: boolean) => void;
  editRejected: boolean;
  setEditRejected: (v: boolean) => void;
  // Anime
  animeUpdate: boolean;
  setAnimeUpdate: (v: boolean) => void;
  myAnime: boolean;
  setMyAnime: (v: boolean) => void;
  // Users
  userFollow: boolean;
  setUserFollow: (v: boolean) => void;
  // System
  system: boolean;
  setSystem: (v: boolean) => void;
}

const groupClass = "mb-8";

const SettingsNotificationsTab: React.FC<SettingsNotificationsTabProps> = ({
  commentReply,
  setCommentReply,
  commentMention,
  setCommentMention,
  commentInCollection,
  setCommentInCollection,
  commentInEdit,
  setCommentInEdit,
  commentRating,
  setCommentRating,
  collectionRating,
  setCollectionRating,
  editAccepted,
  setEditAccepted,
  editRejected,
  setEditRejected,
  animeUpdate,
  setAnimeUpdate,
  myAnime,
  setMyAnime,
  userFollow,
  setUserFollow,
  system,
  setSystem,
}) => {
  return (
    <div
      className="w-full flex justify-center items-start min-h-[772px] px-2"
      style={{ background: "none" }}
    >
      <div
        className="flex flex-col items-start gap-6 mx-auto"
        style={{ width: 599, minHeight: 772 }}
      >
        <h2
          className="font-bold mb-0"
          style={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 24,
            lineHeight: "29px",
            color: "#fff",
          }}
        >
          Сповіщення
        </h2>
        <p
          className="mb-2"
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "19px",
            color: "#bfc6d5",
          }}
        >
          Налаштуйте персоналізовані сповіщення
        </p>
        <NotificationSwitchGroup title="Коментарі" className="mb-6 w-full">
          <NotificationSwitchRow
            label="Відповідь на коментар"
            sublabel="Ви отримаєте сповіщення, коли на ваш коментар відповіли"
            checked={commentReply}
            onChange={setCommentReply}
          />
          <NotificationSwitchRow
            label="Згадка в коментарі"
            sublabel="Ви отримаєте сповіщення, коли вас згадали (@) в коментарі"
            checked={commentMention}
            onChange={setCommentMention}
          />
          <NotificationSwitchRow
            label="Коментар у колекції"
            sublabel="Ви отримаєте сповіщення, коли у вашій колекції залишили коментар"
            checked={commentInCollection}
            onChange={setCommentInCollection}
          />
          <NotificationSwitchRow
            label="Коментар у правці"
            sublabel="Ви отримаєте сповіщення, коли вам залишать коментар у правці"
            checked={commentInEdit}
            onChange={setCommentInEdit}
          />
        </NotificationSwitchGroup>
        <NotificationSwitchGroup title="Оцінки" className="mb-6 w-full">
          <NotificationSwitchRow
            label="Оцінка коментаря"
            sublabel="Ви отримаєте сповіщення, коли ваш коментар оцінили"
            checked={commentRating}
            onChange={setCommentRating}
          />
          <NotificationSwitchRow
            label="Оцінка колекції"
            sublabel="Ви отримаєте сповіщення, коли вашу колекцію оцінили"
            checked={collectionRating}
            onChange={setCollectionRating}
          />
        </NotificationSwitchGroup>
        <NotificationSwitchGroup title="Правки" className="mb-6 w-full">
          <NotificationSwitchRow
            label="Прийнята правка"
            sublabel="Ви отримаєте сповіщення, коли ваша правка прийнята"
            checked={editAccepted}
            onChange={setEditAccepted}
          />
          <NotificationSwitchRow
            label="Відхилена правка"
            sublabel="Ви отримаєте сповіщення, коли ваша правка відхилена"
            checked={editRejected}
            onChange={setEditRejected}
          />
        </NotificationSwitchGroup>
        <NotificationSwitchGroup title="Аніме" className="mb-6 w-full">
          <NotificationSwitchRow
            label="Оновлення аніме"
            sublabel="Ви отримаєте сповіщення про вихід нових епізодів аніме"
            checked={animeUpdate}
            onChange={setAnimeUpdate}
          />
          <NotificationSwitchRow
            label="Мої аніме"
            sublabel="Ваші підписки на аніме. Отримуйте сповіщення про оновлення або видаляйте тайтли зі списку"
            checked={myAnime}
            onChange={setMyAnime}
          />
        </NotificationSwitchGroup>
        <NotificationSwitchGroup title="Користувачі" className="mb-6 w-full">
          <NotificationSwitchRow
            label="Підписка на користувача"
            sublabel="Ви отримаєте сповіщення, коли хтось підписався на Вас"
            checked={userFollow}
            onChange={setUserFollow}
          />
        </NotificationSwitchGroup>
        <NotificationSwitchGroup title="Інше" className="mb-10 w-full">
          <NotificationSwitchRow
            label="Системні оповіщення"
            sublabel="Ви отримаєте сповіщення про системні зміни"
            checked={system}
            onChange={setSystem}
          />
        </NotificationSwitchGroup>
        <div className="w-full flex justify-end mt-8">
          <BlueButton
            text="Зберегти"
            className="w-40 h-12 text-lg font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsNotificationsTab;
