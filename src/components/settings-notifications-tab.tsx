import React from "react";
import NotificationSwitchGroup from "@/components/notification-switch-group";
import NotificationSwitchRow from "@/components/notification-switch-row";

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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-0 pt-8">
      <h2 className="text-2xl font-bold text-white mb-1">Сповіщення</h2>
      <p className="text-[#918C8C] mb-8 text-base">
        Налаштуйте персоналізовані сповіщення
      </p>
      <div className="flex flex-col md:flex-row gap-16 w-full">
        {/* Left column */}
        <div className="flex-1 min-w-[320px]">
          <NotificationSwitchGroup title="Коментарі">
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
          <NotificationSwitchGroup title="Оцінки">
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
          <NotificationSwitchGroup title="Правки">
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
        </div>
        {/* Right column */}
        <div className="flex-1 min-w-[320px]">
          <NotificationSwitchGroup title="Аніме">
            <NotificationSwitchRow
              label="Оновлення аніме"
              sublabel="Ви отримаєте сповіщення про вихід нових епізодів аніме"
              checked={animeUpdate}
              onChange={setAnimeUpdate}
            />
            <NotificationSwitchRow
              label="Мої аніме"
              sublabel="Ваші підписки на аніме. Отримуйте сповіщення про оновлення або видаляте тайтли зі списку"
              checked={myAnime}
              onChange={setMyAnime}
            />
          </NotificationSwitchGroup>
          <NotificationSwitchGroup title="Користувачі">
            <NotificationSwitchRow
              label="Підписка на користувача"
              sublabel="Ви отримаєте сповіщення, коли хтось підписався на Вас"
              checked={userFollow}
              onChange={setUserFollow}
            />
          </NotificationSwitchGroup>
          <NotificationSwitchGroup title="Інше">
            <NotificationSwitchRow
              label="Системні оповіщення"
              sublabel="Ви отримаєте сповіщення про системні зміни"
              checked={system}
              onChange={setSystem}
            />
          </NotificationSwitchGroup>
          <div className="flex w-full mt-8">
            <button
              type="button"
              className="flex flex-row items-center justify-center bg-[#4B7FCC] rounded-[8px] w-[98px] h-[43px] px-0 py-0 gap-2"
            >
              <span className="block text-white text-[16px] leading-[19px] font-normal font-inter text-center w-[74px] h-[19px]">
                Зберегти
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsNotificationsTab;
