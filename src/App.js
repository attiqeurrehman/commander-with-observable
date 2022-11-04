import { useRef, useEffect } from "react";
import { CommandBar } from "@fluentui/react/lib/CommandBar";
import { FontSizes } from "@fluentui/theme";
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

const overflowProps = { ariaLabel: "More commands" };

const state = observable({
  canNew: false,
  canUpload: false,
  canShare: false,
  canDownload: false
});

export default observer(function TaskApp() {
  const ref = useRef(1);
  useEffect(() => {
    ++ref.current;
  });

  return (
    <>
      <CommandBar
        items={_items}
        overflowItems={_overflowItems}
        overflowButtonProps={overflowProps}
        farItems={_farItems}
        ariaLabel="Inbox actions"
        primaryGroupAriaLabel="Email actions"
        farItemsGroupAriaLabel="More actions"
      />
      <div style={{ fontSize: FontSizes.size18 }}>
        Render count {ref.current}
      </div>
    </>
  );
});

const _items = [
  {
    key: "newItem",
    text: "New",
    cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
    iconProps: { iconName: "Add" },
    disabled: !state.canNew.get(),
    subMenuProps: {
      items: [
        {
          key: "emailMessage",
          text: "Email message",
          iconProps: { iconName: "Mail" }
        },
        {
          key: "calendarEvent",
          text: "Calendar event",
          iconProps: { iconName: "Calendar" }
        }
      ]
    }
  },
  {
    key: "upload",
    text: "Upload",
    iconProps: { iconName: "Upload" },
    subMenuProps: {
      items: [
        {
          key: "uploadfile",
          text: "File",
          preferMenuTargetAsEventTarget: true,
          onClick: (ev) => {
            ev.persist();
          }
        },
        {
          key: "uploadfolder",
          text: "Folder",
          preferMenuTargetAsEventTarget: true,
          onClick: (ev) => {
            ev.persist();
          }
        }
      ]
    }
  },
  {
    key: "share",
    text: "Share",
    iconProps: { iconName: "Share" },
    onClick: () => console.log("Share")
  },
  {
    key: "download",
    text: "Download",
    iconProps: { iconName: "Download" },
    onClick: () => console.log("Download")
  }
];

const _overflowItems = [
  {
    key: "move",
    text: "Move to...",
    onClick: () => console.log("Move to"),
    iconProps: { iconName: "MoveToFolder" }
  },
  {
    key: "copy",
    text: "Copy to...",
    onClick: () => console.log("Copy to"),
    iconProps: { iconName: "Copy" }
  },
  {
    key: "rename",
    text: "Rename...",
    onClick: () => console.log("Rename"),
    iconProps: { iconName: "Edit" }
  }
];

const _farItems = [
  {
    key: "tile",
    text: "Grid view",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Grid view",
    iconOnly: true,
    iconProps: { iconName: "Tiles" },
    onClick: () => {
      state.canNew.set(!state.canNew.get());
      console.log("Tiles");
    }
  },
  {
    key: "info",
    text: "Info",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Info",
    iconOnly: true,
    iconProps: { iconName: "Info" },
    onClick: () => console.log("Info")
  }
];
