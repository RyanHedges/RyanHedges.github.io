module NavHelpers
  def pager_disabled(page)
    if !page
      return "disabled"
    end
  end
end
