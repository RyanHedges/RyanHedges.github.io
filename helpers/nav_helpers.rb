module NavHelpers
  def pager_disabled(page)
    if !page
      return "disabled"
    end
  end

  def nav_link(link_text, url, options = {})
    options[:class] ||= ""
    options[:class] << "active" if url == current_page.url
    link_to(link_text, url, options)
  end
end
