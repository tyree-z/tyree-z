<template>
  <div v-if="isAuthenticated" class="d-none d-md-flex">
    <div class="nav-item dropdown d-none d-md-flex me-3">
      <a
        href="#"
        class="nav-link px-0"
        data-bs-toggle="dropdown"
        tabindex="-1"
        aria-label="Show notifications"
      >
        <IconBell class="icon text-muted" />
        <span class="badge bg-red"></span>
      </a>
      <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Last updates</h3>
          </div>
          <div class="list-group list-group-flush list-group-hoverable">
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col-auto">
                  <span class="status-dot status-dot-animated bg-red d-block"></span>
                </div>
                <div class="col text-truncate">
                  <a href="#" class="text-body d-block">Example 1</a>
                  <div class="d-block text-muted text-truncate mt-n1">
                    Change deprecated html tags to text decoration classes (#29604)
                  </div>
                </div>
                <div class="col-auto">
                  <a href="#" class="list-group-item-actions">
                    <IconCampfire class="icon text-muted" />
                  </a>
                </div>
              </div>
            </div>
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col-auto"><span class="status-dot d-block"></span></div>
                <div class="col text-truncate">
                  <a href="#" class="text-body d-block">Example 2</a>
                  <div class="d-block text-muted text-truncate mt-n1">
                    justify-content:between ⇒ justify-content:space-between (#29734)
                  </div>
                </div>
                <div class="col-auto">
                  <a href="#" class="list-group-item-actions show">
                    <IconCampfire class="icon text-muted" />
                  </a>
                </div>
              </div>
            </div>
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col-auto"><span class="status-dot d-block"></span></div>
                <div class="col text-truncate">
                  <a href="#" class="text-body d-block">Example 3</a>
                  <div class="d-block text-muted text-truncate mt-n1">
                    Update change-version.js (#29736)
                  </div>
                </div>
                <div class="col-auto">
                  <a href="#" class="list-group-item-actions">
                    <IconCampfire class="icon text-muted" />
                  </a>
                </div>
              </div>
            </div>
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col-auto">
                  <span class="status-dot status-dot-animated bg-green d-block"></span>
                </div>
                <div class="col text-truncate">
                  <a href="#" class="text-body d-block">Example 4</a>
                  <div class="d-block text-muted text-truncate mt-n1">
                    Regenerate package-lock.json (#29730)
                  </div>
                </div>
                <div class="col-auto">
                  <a href="#" class="list-group-item-actions">
                    <IconCampfire class="icon text-muted" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconBell, IconCampfire } from '@tabler/icons-vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated } = useAuth0()
</script>
