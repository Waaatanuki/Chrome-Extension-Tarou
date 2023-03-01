查询素材列表接口：/item/article_list_by_filter_mode

```
[{
    item_id: string;
    image: string;
    name: string;
    number: string;
    comment: string;
    seq_id: string;
    disable: string;
    category_type: string[];
    is_display_select_item: boolean;
}]

```

查询武器列表接口：/weapon/list

```
{
    list: List[];
    first: number;
    last: number;
    prev: number;
    next: number;
    count: number;
    current: number;
    options: Options;
    default_selector: DefaultSelector;
    has_default_selector: boolean;
}
```

贤者武器和召唤等级只能匹配 ssr 的
