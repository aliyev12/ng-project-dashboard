import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects => {
      const archivedProjects = [];
      projects.map(project => {
        if (project.archived === true) {
          archivedProjects.push(project);
        }
      });
       this.projects = archivedProjects;
    }));
  }

  onRestore(index: number) {
    if (confirm('Are you sure you want to restore this project?')) {
      this.projectService.restoreProject(this.projects[index].id);
      console.log(`Project with ID# ${this.projects[index].id} is being archived...`);
    }
  }


}
