<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use App\Models\Technology;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'Portfolio';
    protected static ?string $navigationLabel = 'Projects';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Project
                Section::make('Project')
                    ->description(__('Enter the details of the project.'))
                    ->collapsible()
                    ->schema([
                        Group::make([
                            TextInput::make('name')
                                ->label(__('Name'))
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(function (string $state, Set $set) {
                                    $set('slug', Str::slug($state) ?? '');
                                }),
                            TextInput::make('slug')
                                ->label(__('Slug'))
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->disabled(),
                            TextInput::make('url')
                                ->label(__('URL'))
                                ->placeholder(__('Enter the URL of the project')),
                            TextInput::make('year')
                                ->label(__('Year'))
                                ->required()
                                ->numeric(),
                            RichEditor::make('description')
                                ->label(__('Description'))
                                ->required()
                                ->columnSpanFull(),
                            Toggle::make('is_featured')
                                ->label(__('Featured'))
                                ->required(),
                            FileUpload::make('thumbnail')
                                ->disk('public')
                                ->directory('projects')
                                ->label(__('Thumbnail Image'))
                                ->placeholder(__('Upload thumbnail image'))
                                ->acceptedFileTypes(['image/*'])
                                ->columnSpanFull(),
                        ])
                    ])
                    ->columnSpan(3),

                // Technologies
                Section::make('Technologies')
                    ->description(__('Select the technologies used in the project.'))
                    ->collapsible()
                    ->schema([
                        Select::make('technologies')
                            ->multiple()
                            ->relationship('technologies', 'name')
                            ->searchable()
                            ->preload()
                            ->label(__('Technologies'))
                            ->placeholder(__('Select technologies')),
                    ])
                    ->columnSpan(2),
            ])
            ->columns(5);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable(),
                ImageColumn::make('thumbnail')
                    ->label(__('Thumbnail')),
                TextColumn::make('url')
                    ->searchable(),
                ToggleColumn::make('is_featured'),
                TextColumn::make('year')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('technologies')
                    ->label(__('Technologies'))
                    ->placeholder(__('Select technologies'))
                    ->options(Technology::all()->pluck('name', 'id'))
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
