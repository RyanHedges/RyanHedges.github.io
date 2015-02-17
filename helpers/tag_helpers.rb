module TagHelpers
  def tag_link(article, tag)
    tag_item = tag != article.tags.last ? tag.concat(",") : tag
    link_to tag_item, tag_path(tag) 
  end
end
