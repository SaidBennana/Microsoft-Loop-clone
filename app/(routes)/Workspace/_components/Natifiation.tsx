"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
  useUpdateRoomNotificationSettings,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { ReactNode, useEffect } from "react";
import { CircleDashed } from "lucide-react";

export default function Natifiation({ children }: { children: ReactNode }) {
  const { inboxNotifications } = useInboxNotifications();
  const updateRoomNatifaction = useUpdateRoomNotificationSettings();
  const { count, error, isLoading } = useUnreadInboxNotificationsCount();
  useEffect(() => {
    updateRoomNatifaction({ threads: "all" });
  }, []);
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="relative">
            {count >= 1 && (
              <span className="w-2 h-2 bg-sky-500 rounded-full absolute top-0 right-0 animate-pulse"></span>
            )}
            {isLoading?
            <div className="animate-spin">
              <CircleDashed />
            </div>
            :

            children
            }
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[550px]">
          <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
              />
            ))}
          </InboxNotificationList>
        </PopoverContent>
      </Popover>
    </div>
  );
}
