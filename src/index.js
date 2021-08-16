import RecordController from './UI/RecordController';
import PermissionsWindowUI from './UI/PermissionsWindowUI';
import VideoRecorderUI from './UI/VideoRecorderUI';
import AudioRecorderUI from './UI/AudioRecorderUI';
import TextMessageUI from './UI/TextMessageUI';
import MediaUploaderUI from './UI/MediaUploaderUI';
import PinnedItem from './UI/PinnedItem';
import FeedRenderer from './UI/FeedRenderer';
import Api from './Api';

let feed = null;
let pinnedItem = null;
let loading = false;
let maxId = 0;

const listeners = {
  onSetPinned: (item, pinned) => Api.setPinned(item.id, pinned, () => {
    pinnedItem.setPinned(pinned ? item : null);
    feed.render();
  }),
  onScrollEnd: () => {
    if (loading) {
      return;
    }

    const fromId = Math.max(...feed.feed.map((item) => item.id));
    if (maxId === fromId) {
      return;
    }

    loading = true;
    Api.listMedia(fromId, (data) => {
      feed.appendItems(data.items);
      maxId = data.maxId;
      loading = false;
    });
  },
};

pinnedItem = new PinnedItem({ listeners });
feed = new FeedRenderer({ listeners, pinnedItem });

const recordController = new RecordController();
const permissionsWindow = new PermissionsWindowUI();

(new VideoRecorderUI({ feed, recordController, permissionsWindow })).render();
(new AudioRecorderUI({ feed, recordController, permissionsWindow })).render();
(new TextMessageUI({ feed })).render();
(new MediaUploaderUI({ feed })).render();

// initial data load
Api.getPinned((item) => {
  pinnedItem.setPinned(item);
  Api.listMedia(undefined, (data) => feed.appendItems(data.items));
});
