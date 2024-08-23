import CreateMilestone from '@/components/admin/create-milestone/CreateMilestone'
import BreadcrumbDiv from '@/components/BreadcrumbDiv'
import React from 'react'

const page = () => {
  return (
    <div>
        <BreadcrumbDiv
                    options={[
                        { label: "Home", link: "/admin" },
                        { label: "Milestones", link: "/admin/milestones" },
                        { label: "Add Milestone", link: "/admin/milestones/create", active: true },
                    ]}
                />

        <CreateMilestone />
    </div>
  )
}

export default page