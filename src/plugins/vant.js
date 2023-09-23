import Vue from 'vue'
import 'vant/lib/index.css'
import Button from 'vant/lib/button';
import { Cell, CellGroup } from 'vant';
import { Icon } from 'vant';
import { Image as VanImage } from 'vant';
import { Popup } from 'vant';
import { Field } from 'vant';
import { Form } from 'vant';
import { Picker } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Uploader } from 'vant';
import { Divider } from 'vant';
import { NoticeBar } from 'vant';
import { Tab, Tabs } from 'vant';
import { Area } from 'vant';
import {Notify} from "vant";
import { List } from 'vant';
import {Row,Col} from "vant";
import { Swipe, SwipeItem } from 'vant';
import { Overlay } from 'vant';
import { Toast } from 'vant';
import { Empty } from 'vant';
import {Dialog} from "vant";

Vue.use(Overlay);

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(List);
Vue.use(Notify);
Vue.use(Area);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NoticeBar);
Vue.use(Divider);
Vue.use(Uploader);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Picker);
Vue.use(Form);
Vue.use(Field);
Vue.use(Popup);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(Dialog)

