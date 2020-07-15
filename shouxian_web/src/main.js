import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox,
    Message,
    Notification,
    Scrollbar
} from 'element-ui';

Vue.use(Pagination).use(Dialog).use(Autocomplete).use(Dropdown).use(DropdownMenu).use(DropdownItem).
    use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup).use(Input).use(InputNumber).use(Radio)
    .use(RadioGroup).use(RadioButton).use(Checkbox).use(CheckboxButton).use(CheckboxGroup).use(Switch)
    .use(Select).use(Option).use(OptionGroup).use(Button).use(ButtonGroup).use(Table).use(TableColumn)
    .use(DatePicker).use(TimeSelect).use(TimePicker).use(Popover).use(Tooltip).use(Breadcrumb).use(BreadcrumbItem)
    .use(Form).use(FormItem).use(Tabs).use(TabPane).use(Tag).use(Tree).use(Alert).use(Slider).use(Icon).use(Row)
    .use(Col).use(Upload).use(Progress).use(Spinner).use(Badge).use(Card).use(Rate).use(Steps).use(Step).
    use(Carousel).use(CarouselItem).use(Collapse).use(CollapseItem).use(Cascader).use(ColorPicker)
    .use(Transfer).use(Container).use(Header).use(Aside).use(Main).use(Footer).use(Timeline).use(TimelineItem)
    .use(Link).use(Divider).use(Image).use(Calendar).use(Backtop).use(PageHeader).use(CascaderPanel).use(Scrollbar)
    .use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.use(Vuex)
Vue.config.productionTip = false

import $axios from './libs/axios'
Vue.prototype.$http = $axios

import common from './libs/common'
Vue.prototype.$common = common

Vue.directive('clickOutSide', {
    bind(el, binding, vnode) {
      el.handler = function(e) {
        if (el.contains(e.target)) {
          return false
        }
        // vnode.context[binding.expression] = false
        binding.value()
      }
      el.stopProp = function(event) {
        event.stopPropagation()
      }
      el.addEventListener('click', el.stopProp)
      document.body.addEventListener('click', el.handler)
    },
    unbind(el, binding) {
      el.removeEventListener('click', el.stopProp)
      document.body.removeEventListener('click', el.handler)
    }
  })
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})
