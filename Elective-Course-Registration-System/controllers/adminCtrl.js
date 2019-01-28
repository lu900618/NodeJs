exports.showAdminDashboard = (req, res) => {
  res.render('admin/index', {
    page: 'index'
  })
}

exports.showAdminCourse = (req, res) => {
  res.render('admin/course', {
    page: 'course'
  })
}

exports.showAdminReport = (req, res) => {
  res.render('admin/report', {
    page: 'report'
  })
}
